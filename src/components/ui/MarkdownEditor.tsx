import MDEditor from '@uiw/react-md-editor';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function MarkdownEditor({
    value,
    onChange,
    placeholder,
}: MarkdownEditorProps) {
    return (
        <div>
            <MDEditor
                value={value}
                onChange={(val) => onChange(val || '')}
                preview="edit"
                textareaProps={{
                    placeholder,
                }}
            />
            {/* <MDEditor.Markdown
                source={value}
                style={{ whiteSpace: 'pre-wrap' }}
            /> */}
        </div>
    );
}
