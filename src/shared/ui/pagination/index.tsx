import React, { Dispatch } from 'react'
import { TAKE } from 'shared/lib/contants'
import styles from './styles.module.scss'

interface Props {
  totalPages: number
  page: number
  take: number
  setPage: Dispatch<React.SetStateAction<number>>
  setTake: Dispatch<React.SetStateAction<number>>
}

export const Pagination: React.FC<Props> = ({
  totalPages, 
  page,
  take,
  setPage,
  setTake,
}) => {
  const pageBtns = []

  for (let i = 1; i < totalPages + 1; i++) {
    pageBtns.push(
      <a
        key={i}
        onClick={() => setPage(i)}
      >{i}</a>
    )
  }

  function onChange(e: any) {
    setTake(e.target.value)
  }

  return (
    <div className={styles["pagination"]}>
      {totalPages > 1 && pageBtns}
      <select defaultValue={take} onChange={onChange}>
        {TAKE.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
}