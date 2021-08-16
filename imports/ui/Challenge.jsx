import React from "react"

export const Challenge = ({ challenge, onCompleteClick, onDeleteClick }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!challenge.isCompleted}
        onClick={() => onCompleteClick(challenge)}
        readOnly
      />
      <span>{challenge.title}</span>
      <button onClick={() => onDeleteClick(challenge)}>&times;</button>
    </li>
  )
}
