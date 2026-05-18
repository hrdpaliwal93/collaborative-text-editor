// src/Tiptap.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';

const [socket, setSocket] = useState();
useEffect(()=>{
    let ws =  new WebSocket("ws://localhost:8000");
    setSocket(ws);
},[])


function sendToServer(){
    

}



const debouncedAutoSave = useCallback(
    debounce((jsonContent) => {
      console.log('Auto-saving...');
      sendToServer(jsonContent);
    }, 1500), // Waits for 1.5 seconds of inactivity
    []
  );



const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: '<p>Hello World!</p>', // initial 
    
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      debouncedAutoSave(json);
    },
  
  })

  return (
    <>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </>
  )
}

export default Tiptap