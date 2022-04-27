import {CreatePostPayload} from "./post.routes";
import {ControllerResponse} from "../shared/domain/ControllerResponse";
import {PostService} from "./post.service";

export const CreatePostController = async (postService: PostService, payload: CreatePostPayload): Promise<ControllerResponse<unknown>> =>{
    await postService.createPosts([payload])
    return { body: undefined, statusCode: 201 }
}
