'use client';

import { useState, useEffect, useRef, ReactElement, Children, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
        position: 'relative',
      }}
      className="group/sort"
      {...attributes}
    >
      {/* Drag handle ⠿ — visible with border, highlights on hover */}
      <div
        {...listeners}
        style={{ touchAction: 'none' }}
        className="absolute top-2 right-2 z-20 flex items-center justify-center w-7 h-7 rounded-md cursor-grab active:cursor-grabbing border border-gray-500/50 bg-gray-700/80 hover:bg-indigo-500 hover:border-indigo-400 group-hover/sort:border-gray-400/60 transition-all duration-150"
        title="Drag to reorder"
        aria-label="Drag to reorder"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-gray-300 group-hover/sort:text-white text-sm leading-none select-none" aria-hidden="true">⠿</span>
      </div>
      {children}
    </div>
  );
}

export default function SortableGrid({ sectionKey, className, children }: {
  sectionKey: string;
  className?: string;
  children: React.ReactNode;
}) {
  const childArray = Children.toArray(children).filter(Boolean) as ReactElement[];
  const count = childArray.length;
  const ids = useRef(Array.from({ length: count }, (_, i) => `${sectionKey}-${i}`));
  
  const [order, setOrder] = useState<string[]>(ids.current);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Sync ids ref when count changes
  if (count !== ids.current.length) {
    ids.current = Array.from({ length: count }, (_, i) => `${sectionKey}-${i}`);
  }

  useEffect(() => {
    // Load from localStorage
    const key = `lifestats-order-${sectionKey}`;
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        if (parsed.length === ids.current.length && ids.current.every(id => parsed.includes(id))) {
          setOrder(parsed);
        }
      }
    } catch { /* ignore */ }
    setReady(true);
  }, [sectionKey]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  const onDragStart = useCallback((e: DragStartEvent) => setActiveId(e.active.id as string), []);
  
  const onDragEnd = useCallback((e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    setOrder(prev => {
      const oi = prev.indexOf(active.id as string);
      const ni = prev.indexOf(over.id as string);
      if (oi === -1 || ni === -1) return prev;
      const next = arrayMove(prev, oi, ni);
      localStorage.setItem(`lifestats-order-${sectionKey}`, JSON.stringify(next));
      return next;
    });
  }, [sectionKey]);

  const idxMap = new Map(ids.current.map((id, i) => [id, i]));
  const activeIdx = activeId ? idxMap.get(activeId) : undefined;

  // Before hydration, render plain grid (no drag)
  if (!ready) {
    return <div className={className}>{children}</div>;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <SortableContext items={order} strategy={rectSortingStrategy}>
        <div className={className}>
          {order.map(id => {
            const idx = idxMap.get(id);
            if (idx === undefined || idx >= childArray.length) return null;
            return (
              <SortableItem key={id} id={id}>
                {childArray[idx]}
              </SortableItem>
            );
          })}
        </div>
      </SortableContext>
      <DragOverlay adjustScale={false}>
        {activeIdx !== undefined && activeIdx < childArray.length ? (
          <div className="opacity-95 scale-[1.02] rounded-xl shadow-2xl shadow-indigo-500/30 pointer-events-none">
            {childArray[activeIdx]}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
