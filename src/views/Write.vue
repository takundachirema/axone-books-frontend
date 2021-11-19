
<template>
    <div id="app">
        <div id="toolbar-container"></div>
        <div id="editor">
            <p>This is the editor content.</p>
        </div>
    </div>
</template>

<script>
    import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';
    //import CommentsEditor from '@ckeditor/ckeditor5-comments';

    export default {
        name: 'app',
        data() {
            return {
            };
        },
        mounted(){
            DecoupledEditor
                .create( 
                    document.querySelector('#editor')
                )
                .then( editor => {
                    const toolbarContainer = document.querySelector('#toolbar-container');

                    toolbarContainer.appendChild( editor.ui.view.toolbar.element );

                    window.editor = editor;
                } )
                .catch( err => {
                    console.error( err );
                } );
        },
        created(){
            
        }
    }
</script> 