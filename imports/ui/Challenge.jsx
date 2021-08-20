import React from 'react';

export default ({ challenge, onCompleteClick, onDeleteClick }) => (
  <li>
    <input type="checkbox" checked={!!challenge.isCompleted} onClick={() => onCompleteClick(challenge)} readOnly />
    <span>{challenge.title}</span>
    <button type="submit" onClick={() => onDeleteClick(challenge)}>&times;</button>
  </li>
);
