'use client';
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import './styles.css'; // Add dark version of snow theme

import ImageResize from 'quill-image-resize-module-react'
Quill.register('modules/imageResize', ImageResize)

export function ChallengeDescriptionEditor({
    value,
    onChange,
}: {
    value: string;
    onChange: (description: string) => void;
}) {

    return (
        <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={onChange}
        />
    );
}

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, false] }],
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
        [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
        ['link', 'image'],
        ['clean'],
    ],
    imageResize: {
        modules: ['Resize', 'DisplaySize']
    }
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
    "script",
    "width",
];