import { sandboxAction } from "../interfaces/sandboxInterfaces";
import { CHANGE_SANDBOX } from "../types";

export function changeSandbox() : sandboxAction {
    return {
        type: CHANGE_SANDBOX
    }
}