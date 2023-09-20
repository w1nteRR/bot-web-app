export const Test = () => {
  return (
    <form className='border w-2/3 p-3' style={{ background: '#C9DADF' }}>
      <div className='flex p-2 justify-between border-b-2'>
        <p className='font-bold' style={{ color: '#277A94' }}>
          Randrom Number Generator
        </p>
        <div>X</div>
      </div>

      <div className='mt-10 mb-5 border-b-2 pb-3'>
        <select className='mr-10' style={{ width: 120, padding: 4 }}>
          <option>Label 1</option>
          <option>Label 2</option>
        </select>
        <label>Select column to be filled</label>
      </div>

      <div>
        <select className='mr-10' style={{ width: 120, padding: 4 }}>
          <option>Label 1</option>
          <option>Label 2</option>
        </select>
        <label>
          Select distribution the random numbers should be generated from.
        </label>
      </div>

      <p className='my-10'>Chose parameter to describe distribution:</p>

      <div className='my-3'>
        <input type='text' className='mr-10' value='1' />
        <label>β describing the shape {'k>0'}</label>
      </div>

      <div>
        <input type='text' className='mr-10' value='2' />
        <label>λ describing the rate {'λ>0'}</label>
      </div>

      <div className='my-3'>
        <input type='number' value={1} className='mr-10' />
        <label>Count of random numbers to generate (max. 254)</label>
      </div>

      <div className='flex justify-end gap-x-5'>
        <button style={{ backgroundColor: '#EBE9E9', width: 100 }}>Ok</button>
        <button style={{ backgroundColor: '#EBE9E9', width: 100 }}>
          Close
        </button>
      </div>
    </form>
  )
}
