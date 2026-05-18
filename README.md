# WEB103 Prework - *Creatorverse*

Submitted by: **Wangying**

About this web app: **Creatorverse is a React/Vite app for discovering, adding, viewing, editing, and deleting favorite content creators using Supabase as the database.**

Time spent: **X** hours

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [ ] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [ ] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

* [x] React Router routes are used for the homepage, add creator page, edit creator page, and individual creator detail pages.
* [x] Supabase configuration uses Vite environment variables instead of hardcoded credentials.
* [x] Empty, loading, and creator-not-found states are displayed for database-backed pages.

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='assets/walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ffmpeg.

## Notes

The app uses Supabase for CRUD operations and React Router for page navigation. The `.env` file must include `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for the database connection to work locally.

## License

Copyright [2026] [Wangying]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
