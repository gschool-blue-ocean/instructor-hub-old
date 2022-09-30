import react from 'react'

export default Fields = () => {
    return (
        <div className="p-0 m-0 block font-normal text-[12px] font-serif">
        <div className="pt-[80px] pb-[150px] flex flex-col items-center font-serif font-normal text-[12px]">
            <div className="relative block font-normal text-[12px]">
                <div className="gap-[32px] w-[100%] flex flex-col font-normal text-[12px]">
                    <div className="flex flex-col gap-[8px] my-[8px] mx-[16px] font-normal font-serif text-[12px]">
                        <div className="text-[32px] uppercase tracking-[0.055em] font-[200] block font-serif">
                            Sign in
                        </div>
                    </div>
                    <div className="rounded-[4px] py-[24px] px-[32px] min-w-[636px] flex-1 block text-[12px] font-normal">
                        <div className="flex flex-row flex-1 text-[12px] font-normal font-serif">
                            <form className="flex-1 grid gap-[12px] grid-cols-1 font-serif font-normal text-[12px]">
                                <div>
                                    <div className='font-[500] text-[12px] font-serif uppercase tracking-[0.02em] select-none block'>
                                        Sign in with account name
                                    </div>
                                    <input type='text'></input>
                                </div>
                                <div>
                                    <div className='text-[12px] uppercase tracking-[0.02em] select-none block'>
                                        Password
                                    </div>
                                    <input type='password'></input>
                                </div>
                                <div className='flex flex-row items-center cursor-pointer font-serif font-normal text-[12px]'>
                                    <input type='checkbox' className='pt-[80px] pb-[150px] flex flex-col items-center font-normal font-serif text-[12px] cursor-pointer'></input>
                                    <div className='text-[12px] select-none pl-[6px] block cursor-pointer font-normal font-serif'>
                                        Remember me
                                    </div>
                                </div>
                                <div className='flex flex-col items-center p-0 m-0 font-serif font-normal text-[12px]'>
                                    <button type='submit'>Sign in</button>
                                </div>
                                <div className='text-[12px] font-[500] text-center'>&nbsp;</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}