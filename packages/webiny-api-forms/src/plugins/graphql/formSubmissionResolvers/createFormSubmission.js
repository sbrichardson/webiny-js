// @flow
import type { IForm } from "webiny-api-forms/entities";
import { ErrorResponse, NotFoundResponse, Response } from "webiny-api/graphql";

export default async (root: any, args: Object, context: Object) => {
    const { CmsForm } = context.getEntities();
    const form: ?IForm = await CmsForm.findById(args.id);

    if (!form) {
        return new NotFoundResponse(`Form with id "${args.id}" was not found!`);
    }

    try {
        await form.submit(args);
    } catch (e) {
        return new ErrorResponse({
            code: e.code,
            message: e.message,
            data: e.data
        });
    }
    return new Response();
};