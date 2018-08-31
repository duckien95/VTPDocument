export class DocumentSearchModel {
    groupId: number;
    title: string;
    issuedDateFrom: Date;
    issuedDateTo: Date;
    expiredDateFrom: Date;
    expiredDateTo: Date;
    replacedFor: Array<string>;
}
