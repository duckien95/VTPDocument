export class DocumentInsertModel {
    groupId: number;
    title: string;
    content: string;
    summary: string;
    issuedDate: Date;
    expiredDate: Date;
    insertedAt: Date;
    updatedAt: Date;
    updateBy: string;
    insertBy: string;
    viewTimes: number;
    pathFile: string;
    tags: Array<any>;
    replacedFor: string;
    status: number;
}
