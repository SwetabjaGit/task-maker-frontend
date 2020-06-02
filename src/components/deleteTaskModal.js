import React from 'react';


const DeleteTaskModal = ({modalId, handleDelete}) => {
  return (
    <div id={modalId} className="modal fade" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete ?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">
              Close
            </button>
            <button onClick={handleDelete} type="button" className="btn btn-danger" data-dismiss="modal">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default DeleteTaskModal;