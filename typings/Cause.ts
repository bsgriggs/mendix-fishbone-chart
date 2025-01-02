import { ObjectItem } from "mendix";
export default interface ICause {
    obj: ObjectItem;
    rootCause: string;
    subCauses: ICause[];
    order?: number;
    dynamicClass?: string;
}
