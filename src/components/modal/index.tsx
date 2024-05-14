import './modal.scss'

const Modal = () => {
  return (

    <div id="myModal" className=" fade" style={{ display: 'block' }}>
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header">
            <div className="icon-box">
              <i className="material-icons">&#xE5CD;</i>
            </div>
            <h4 className="modal-title">Are you sure?</h4>
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div className="modal-body">
            <p>Do you really want to delete these records? This process cannot be undone.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-info" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal