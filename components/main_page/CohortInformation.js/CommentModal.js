import { useState } from "react";
import { useRecoilState } from "recoil";
import { studentsState, notesState } from "../../state.js";
import Image from "next/image";
import commentStyle from "../../../styles/CommentModal.module.css";

const CommentModal = ({ noteStudent, showCommentModal, setShowCommenttModal, onClose }) => {
  const [students, setStudents] = useRecoilState(studentsState);
  const [notes, setNotes] = useRecoilState(notesState);

  let userNotes = notes.filter(note => note.student_id == noteStudent.student_id); 

  return (
    <>
      {showCommentModal ? (
        <div>
          <div className={commentStyle.background} onClick={onClose}></div>
          <div className={commentStyle.container}>
            <div className={commentStyle.top_bar}></div>
            <div>
              <div className={commentStyle.commentHeader}>
                <div>
                  <div onClick={onClose} className={commentStyle.close}></div>
                  <div className={commentStyle.studentName}>
                    {noteStudent.name}
                  </div>
                </div>
              </div>
              <div>
              <div className={commentStyle.content_container}>
                {userNotes.map((note) => (
                <div className={commentStyle.content}>
                  <div className={commentStyle.commentBorder}>
                    <div className={commentStyle.rightBorder}>
                      <div className={commentStyle.rightInline}>
                        <Image
                          src="/pic1.jpg"
                          width="44"
                          height="44"
                          className={commentStyle.instructorIcon}
                          />
                      </div>
                    </div>
                    <div className={commentStyle.headerContainer}>
                      <div className={commentStyle.headerLayout}>
                        <div className={commentStyle.textColor}>
                          <div className={commentStyle.inlineBlock}>
                            <h4 className={commentStyle.userName}>{note.name}</h4>
                          </div>
                          <>
                            <span className={commentStyle.time}> {new Date(note.note_date).toDateString()}</span>
                            <p className={commentStyle.commentSection}> {note.notes}</p>
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
                </div>
              </div>
              <div className={commentStyle.btn_container}>
                <div onClick={onClose} className={commentStyle.close_btn}>
                  <div className={commentStyle.close_btn_medium}>
                    <span className={commentStyle.cancel}> Close</span>
                  </div>
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
