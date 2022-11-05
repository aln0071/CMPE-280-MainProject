// import React, { Component } from "react";
// import { EditorState } from "draft-js";
// import Editor from "draft-js-plugins-editor";
// import createInlineToolbarPlugin, {
//   Separator
// } from "draft-js-inline-toolbar-plugin";
// import {
//   ItalicButton,
//   BoldButton,
//   UnderlineButton,
//   CodeButton,
//   HeadlineOneButton,
//   HeadlineTwoButton,
//   HeadlineThreeButton,
//   UnorderedListButton,
//   OrderedListButton,
//   BlockquoteButton,
//   CodeBlockButton
// } from "draft-js-buttons";

// import "draft-js/dist/Draft.css";
// import "draft-js-inline-toolbar-plugin/lib/plugin.css";

// const inlineToolbarPlugin = createInlineToolbarPlugin({
//   structure: [
//     BoldButton,
//     ItalicButton,
//     UnderlineButton,
//     CodeButton,
//     Separator,
//     HeadlineOneButton,
//     HeadlineTwoButton,
//     HeadlineThreeButton,
//     UnorderedListButton,
//     OrderedListButton,
//     BlockquoteButton,
//     CodeBlockButton,
//   ],
// });
// const { InlineToolbar } = inlineToolbarPlugin;

// const plugins = [inlineToolbarPlugin];

// class MyEditor extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       editorState: EditorState.createEmpty(),
//     };

//     this.focus = this.focus.bind(this);
//     this.onChange = editorState => this.setState({ editorState });
//   }

//   focus() {
//     this.editor.focus();
//   }

//   render() {
//     return (
//       <div>
//         <div className="editor" onClick={this.focus}>
//           <Editor
//             onBlur={this.blur}
//             editorState={this.state.editorState}
//             handleKeyCommand={this.handleKeyCommand}
//             onChange={this.onChange}
//             plugins={plugins}
//             ref={(element) => { this.editor = element; }}
//             onTab={this.onTab}
//           />
//           <InlineToolbar />
//         </div>
//       </div>
//     );
//   }
// }

// export default MyEditor;