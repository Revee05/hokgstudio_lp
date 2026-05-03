import React, { useEffect, useRef } from 'react';

const RichTextEditor = ({ value, onChange, placeholder }) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const selectLocalImage = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('image', file);

            // Upload using axios (Inertia's axios is fine)
            try {
                const response = await window.axios.post(route('mentor.editor.upload-image'), formData);
                const range = quillRef.current.getSelection();
                quillRef.current.insertEmbed(range.index, 'image', response.data.url);
            } catch (error) {
                console.error('Upload failed', error);
                alert('Image upload failed.');
            }
        };
    };

    useEffect(() => {
        const initQuill = () => {
            if (typeof window !== 'undefined' && window.Quill && editorRef.current && !quillRef.current) {
                quillRef.current = new window.Quill(editorRef.current, {
                    theme: 'snow',
                    placeholder: placeholder || 'Compose an epic...',
                    modules: {
                        toolbar: {
                            container: [
                                [{ 'header': [1, 2, 3, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['link', 'image'],
                                ['clean']
                            ],
                            handlers: {
                                image: selectLocalImage
                            }
                        }
                    },
                });

                quillRef.current.on('text-change', () => {
                    onChange(quillRef.current.root.innerHTML);
                });
            }
        };

        // If Quill is not loaded yet, wait for it
        if (typeof window !== 'undefined' && !window.Quill) {
            const checkQuill = setInterval(() => {
                if (window.Quill) {
                    clearInterval(checkQuill);
                    initQuill();
                }
            }, 100);
            return () => clearInterval(checkQuill);
        } else {
            initQuill();
        }
    }, []);

    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = value || '';
        }
    }, [value]);

    return (
        <div className="mt-1 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700">
            <div ref={editorRef} style={{ minHeight: '150px' }} />
        </div>
    );
};

export default RichTextEditor;
