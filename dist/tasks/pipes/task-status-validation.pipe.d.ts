import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses: string[];
    transform(value: string, metadata: ArgumentMetadata): string;
    private isStatusValid;
}
