import { hideLoader, jsonShow, showLoader } from "../../helpers";

export class Loader{
    static show(){
        return showLoader('theGlobalLoader');
    }
    static hide(){
        return hideLoader('theGlobalLoader');
    }
    static showErrors(errors: Record<string, string[]>){
        return jsonShow(errors);
    }
}