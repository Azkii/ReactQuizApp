import React from 'react';
import FlashCard from './FlashCard';
export default function FlashCardList( {flashcards} ) {
    return (
        <div className="card-grid">
            {flashcards.map(element => {
                return <FlashCard key={element.id} element={element} />
            })}
        </div>
    )
}
