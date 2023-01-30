import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ManagePostsComponent } from "./manage-posts/manage-posts.component";
import { PostsComponent } from "./posts.component";
import { PostsEffects } from "./state/posts.effects";
import { postsReducer } from "./state/posts.reducer";
import { POSTS_STATE_NAME } from "./state/posts.state";

const routes: Routes = [
    {
        path: '',
        component: PostsComponent
    }
];

@NgModule({
    declarations: [PostsComponent, ManagePostsComponent],
    imports: [CommonModule, RouterModule.forChild(routes),
        EffectsModule.forFeature([PostsEffects]),
        StoreModule.forFeature(POSTS_STATE_NAME, postsReducer)
    ]
})
export class PostsModule {

}