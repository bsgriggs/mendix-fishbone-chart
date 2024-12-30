import { ObjectItem } from "mendix";
export default interface IBone {
    obj: ObjectItem;
    rootCause: string;
    subCauses: IBone[];
    order?: number;
}
