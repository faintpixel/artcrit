import { Indicator } from './indicator';
import { Box } from './box';

export class Critique {
    public createDate: Date;
    public age: string;
    public username: string;
    public comment: string;
    public indicators?: Array<Indicator>;
    public paintoverUrl?: string;
    public boxes?: Array<Box>;
    public selected?: boolean;
}
