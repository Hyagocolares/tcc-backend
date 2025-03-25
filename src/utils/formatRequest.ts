// src/utils/formatRequest.ts
import { Request } from '../entities/request/RequestEntity';

export function formatRequest(request: Request) {
    return {
        id: request.id,
        status: request.status,
        createdAt: request.createdAt,
        user: request.user ? {
            id: request.user.id,
            name: request.user.name,
        } : undefined,
        subjects: request.subjects ? request.subjects.map(subject => ({
            id: subject.id,
            subject: subject.subject ? {
                id: subject.subject.id,
                name: subject.subject.name,
                code: subject.subject.code,
                courses: subject.subject.courses ? subject.subject.courses.map(course => ({
                    id: course.id,
                    name: course.name,
                })) : []
            } : undefined
        })) : [],
        locations: request.locations ? request.locations.map(location => ({
            id: location.id,
            start: location.periodEnd,
            end: location.periodEnd
        })) : []
    }
}
