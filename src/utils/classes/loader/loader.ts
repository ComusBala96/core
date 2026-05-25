import { hideLoader, showLoader } from "../../helpers";

export class Loader{
    static show(){

        return showLoader('theGlobalLoader');
    }
    static hide(){

        return hideLoader('theGlobalLoader');
    }
}