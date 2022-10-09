import { useRecoilState } from "recoil";
import { studentsState, notesState } from "../../state.js";
import Image from "next/image";
import commentStyle from "../../../styles/CommentModal.module.css";

const ProjNoteModal = ({ showNotesModal, setShowNotesModal, onClose }) => {
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
                  <div className={commentStyle.studentName}>
                   Student Name
                  </div>
                </div>
              </div>
              <div className={commentStyle.content_container}>
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
                            <h4 className={commentStyle.userName}>Instructor Name</h4>
                          </div>
                          <span className={commentStyle.time}>
                         Date
                          </span>
                          <p className={commentStyle.commentSection}>
                            I have never seen anyone so BAD at coding or
                            spelling......Expelled
                          </p>
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
