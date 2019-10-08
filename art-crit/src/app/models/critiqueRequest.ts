export class CritiqueRequest {
    public id?: string;
    public imageUrl: string;
    public requestedByUser?: string;
    public title: string;
    public description: string;
    public nsfw: boolean;
    public referenceUrl?: string;
    public isPublic: boolean;
    public tags?: Array<string>;
}
