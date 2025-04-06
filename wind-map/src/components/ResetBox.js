/**
 * ResetBox.js
 * 
 * Button to clear the current route and return to root
 * 
 * @author tfilewic
 * @version 2025-04-05 
 */

function ResetBox() {
    return (
        <div className="reset-box">
            <button onClick={() => window.location.reload()}>
                New Route
            </button>
        </div>
    )
}

export default ResetBox;