import { useState, useEffect, useRef } from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import DataChart from '../../dataChart/DataChart'
import TableChart from '../../dataChart/TableChart'
import { isAutheticated } from '../../../auth'
import axios from 'axios'

const QueryHistoryModal = ({ databaseId, chatId, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const token = isAutheticated()
  const fetchCalled = useRef(false) // 👈 Track API call execution

  useEffect(() => {
    if (!databaseId || !isOpen || !chatId || fetchCalled.current) return

    fetchCalled.current = true // 👈 Prevent duplicate calls
    setLoading(true)

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/chathistory/${databaseId}`, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          params: { chatId },
        })
        setData(response.data?.chat)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      fetchCalled.current = false // Reset when modal closes
    }
  }, [databaseId, chatId, isOpen])

  return (
    <CModal visible={isOpen} onClose={onClose} size="lg">
      <CModalHeader>
        <CModalTitle>Query History Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        {data && (
          <div className="mb-3">
            <p className="fw-bold">Question:</p>
            <p>{data.question}</p>

            <p className="fw-bold mt-3">Query:</p>
            <pre className="p-2 bg-light border rounded">{data.query}</pre>

            {data.resultType === 'visualize' ? (
              <>
                <DataChart data={data} />
                <TableChart data={data.data} />
              </>
            ) : (
              <TableChart data={data.data} />
            )}
          </div>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default QueryHistoryModal
