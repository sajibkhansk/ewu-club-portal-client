import React from 'react';
import Marquee from 'react-fast-marquee';

const News = () => {
    return (
        <div className='bg-blue-950 '>
            
        <div className='max-w-screen-xl border-e-0 mx-auto'>
            <div className='flex'>
                <button className='bg-orange-300 btn-xs text-l font-bold'>
                    NOTICE
                </button>
            <Marquee speed={75} className='text-yellow-200 max-w-screen-xl mx-auto'>
                
                ⍟  EWU Computer Science Club is recruiting new Member.{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                ⍟  EWU Performing and Arts Club is arranging a cultural Program on 21 September.
            </Marquee>
            </div>
        </div>
            

        </div>
    );
};

export default News;