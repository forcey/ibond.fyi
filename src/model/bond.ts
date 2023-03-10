export class Bond {
    id: string;
    dateIssued: Date;
    principal: number;

    constructor(dateIssued: Date, principal: number) {
        this.id = crypto.randomUUID();
        this.dateIssued = dateIssued;
        this.principal = principal;
    }
}
