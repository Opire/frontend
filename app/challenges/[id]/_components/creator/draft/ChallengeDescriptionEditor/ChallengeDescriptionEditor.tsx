import { EditorState, LexicalEditor } from 'lexical';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { DefaultTheme } from './DefaultTheme';
import './styles.css';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { debounce } from '../../../../../../_utils/debounce';

function onError(error: unknown) {
    console.error(error);
}

export function ChallengeDescriptionEditor({ onChange }: { onChange: (description: string) => void; }) {
    const initialConfig = {
        namespace: 'Challenge description',
        theme: DefaultTheme,
        onError,
    };

    function handleChangeEditorState(editorState: EditorState) {
        onChange(JSON.stringify(editorState));
    }

    const debouncedHandleChangeEditorState = debounce(handleChangeEditorState, 500);

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="editor-container" onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
            }}>
                <ToolbarPlugin />
                <div className="editor-inner">
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable
                                className="editor-input"
                                aria-placeholder={''}
                                placeholder={
                                    <div className="editor-placeholder">{''}</div>
                                }
                            />
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <OnChangePlugin onChange={debouncedHandleChangeEditorState} />
                </div>
            </div>
        </LexicalComposer>
    );
}