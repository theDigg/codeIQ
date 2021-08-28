# CodeIQ todo list

Create schemas for:
    1. Users
    2. Challenges
    3. Posts (On challenges)
    4. Comments (On posts)
    5. Leaderboard (On challenges)

```js
Users: {
    userId(36),
    name(150),
    dateOfBirth(3),
    email(30),
    college(30),
    username(20),
    password(20),
    cumulativeScore(8),
    addedAt(8),
    updatedAt(8)
}
```

```js
Challenges: {
    challengeId(36),
    name(150),
    challengeStartTime(8),
    challengeEndTime(8)
}
```

```js
Questions: {
    questionId(36),
    challengeId: { foreignKey(36) },
    name(150),
    description(300),
    questionText(2000),
    testCases(2000),
    author(100),
    addedAt(8),
    updatedAt(8),
    editorial(3500),
    comments(2000),
    points(8),
    difficultyLevel(10)
}
```

```js
Submissions: {
    submissionId(36),
    userId: { foreignKey(36) },
    questionId: { foreignKey(36) },
    programmingLanguage(15),
    submittedCode(3000),
    score(8),
    createdAt(8)
}
```
