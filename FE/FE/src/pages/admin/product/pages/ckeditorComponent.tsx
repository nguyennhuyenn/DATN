import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';

const CkEditorComponent = ({ description, onHandleEditorChange }: { description: string, onHandleEditorChange: (_: any, editor: any) => void }) => {
    const cloud = useCKEditorCloud({
        version: '44.1.0',
        premium: true
    });

    if (cloud.status === 'error') {
        return <div>Error!</div>;
    }

    if (cloud.status === 'loading') {
        return <div>Loading...</div>;
    }

    const {
        ClassicEditor,
        Essentials,
        Paragraph,
        Bold,
        Italic,
        Underline,
        Strikethrough,
        BlockQuote,
        Heading,
        Image,
        ImageToolbar,
        ImageCaption,
        ImageStyle,
        Table,
        TableToolbar,
        Link,
        List,
        CodeBlock,
        Alignment
    } = cloud.CKEditor;

    const { FormatPainter } = cloud.CKEditorPremiumFeatures;


    const config = {
        licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDAyNjg3OTksImp0aSI6ImI5OTJkNzMzLTJhNDctNGVjYy04YTNkLWJkYzhhMDA0ZmU3NyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjUwMTJmN2VhIn0.8sFyF7UFAyfVADGJbMqUIwkiI8dpwobbow5WT3FkkBG5OoX1bktNFZfxrPoOdhlHEHcy8BUfz3F4QlbrGWLQlA',
        plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            BlockQuote,
            Heading,
            Image,
            ImageToolbar,
            ImageCaption,
            ImageStyle,
            Table,
            TableToolbar,
            Link,
            List,
            CodeBlock,
            Alignment,
            FormatPainter
        ],
        toolbar: [
            'undo', 'redo',
            '|', 'heading', 'bold', 'italic', 'underline', 'strikethrough',
            '|', 'bulletedList', 'numberedList', 'blockQuote',
            '|', 'link', 'insertTable', 'imageUpload',
            '|', 'alignment', 'codeBlock', 'formatPainter'
        ],
        image: {
            toolbar: ['imageTextAlternative', 'imageStyle:inline', 'imageStyle:block', 'imageStyle:side']
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true
            }
        },
        height: '300px',
    }

    return (
        <CKEditor
            editor={ClassicEditor}
            data={description || "<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>"}
            config={config}
            onChange={onHandleEditorChange}
        />
    );
};


export default CkEditorComponent;
