# JSONBin Schema & Merge Policy

## Schema
Each study session uploaded to JSONBin will have this structure:

```json
{
    "timestamp": "2025-11-01T18:00:00Z",
    "subject": "Computer Science",
    "duration_minutes": 45
}
```
- Key Fields
    - timestamp: ISO-8601 time when the session ended.
    - subject: Name of the study subject.
    - duration_minutes: Length of the study session.

## Examples
POST payload:
```json
{
    "timestamp": "2025-11-01T18:00:00Z",
    "subject": "Math",
    "duration_minutes": 30
}
```

Result (GET):
```json
[
    {"timestamp": "2025-11-01T18:00:00Z", "subject": "Math", "duration_minutes": 30},
    {"timestamp": "2025-11-01T19:15:00Z", "subject": "Science", "duration_minutes": 45}
]
```

## Merge Policy
 - Last-write-wins (timestamp) per record.
 - The app uses the latest timestamp per subject to prevent duplicates.
 - Old records remain for history; duplicates are merged by subject + timestamp.
 