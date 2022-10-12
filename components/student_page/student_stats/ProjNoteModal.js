import { useRecoilState } from "recoil";
import { studentsState, notesState } from "../../state.js";
import Image from "next/image";
import commentStyle from "../../../styles/CommentModal.module.css";

const ProjNoteModal = ({ showNotesModal, setShowNotesModal, onClose, currStudentProjects,currNote }) => {
    const [students, setStudents] = useRecoilState(studentsState);
    const [notes, setNotes] = useRecoilState(notesState);
    
  return (
       <>
      {showNotesModal ? (
        <div>
          <div className={commentStyle.background} onClick={onClose}></div>
          <div className={commentStyle.container}>
            <div className={commentStyle.top_bar}></div>
            <div>
              <div className={commentStyle.commentHeader}>
                <div>
                  <div onClick={onClose} className={commentStyle.close}></div>

                </div>
              </div>
              <div className={commentStyle.content_container}>
                <div className={commentStyle.content}>
                  <div className={commentStyle.commentBorder}>
                    <div className={commentStyle.headerContainer}>
                      <div className={commentStyle.headerLayout}>
                        <div className={commentStyle.textColor}>
                          <div className={commentStyle.inlineBlock}>
                            <h4 className={commentStyle.userName}>{currNote.project_name} </h4>
                          </div>
                          <span className={commentStyle.time}> {currNote.project_passed ? 'PASSED': 'FAILED'}</span>
                          <p className={commentStyle.commentSection}>{currNote.notes}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ProjNoteModal
