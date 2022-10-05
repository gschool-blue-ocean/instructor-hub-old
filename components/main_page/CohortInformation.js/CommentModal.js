import { useState } from "react";
import commentStyle from '../../../styles/CommentModal.module.css'

const CommentModal = ({ showCommentModal, setShowCommenttModal, onClose }) => {
  
    return (
      <>
  {showCommentModal ? (
        <div>
        <div className={commentStyle.background} onClick={onClose}></div>
            <div className= {commentStyle.container}>
            <div className = {commentStyle.top_bar}></div>
                <div>
                <div className= {commentStyle.commentHeader}>
                    <div>
                    <div onClick={onClose} className= {commentStyle.close}></div>
                    <div className= {commentStyle.studentName}> Student 1 </div>
                    </div>
                </div>
                    <div className= {commentStyle.content_container}>
                    <div className= {commentStyle.content}>
                        <div className= {commentStyle.introSentence}> Please enter comments that you feel are relevant below:</div>
                        <textarea className= {commentStyle.app_notes} placeholder= "Type your comment here"></textarea>
                    </div>
                    <div className= {commentStyle.oldComment}>If you wish to see your previous comment please click
                        <a> here</a>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        ) : null}
      </>
    );
  };
  
  export default CommentModal;