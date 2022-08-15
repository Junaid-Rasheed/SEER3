const ProgressBar = ({ className }: { className?: string }) => {
  return (
    <div id="progress-wrapper" className={className}>
      <div id="progress-bar" />
      <style jsx>{`
        #progress-wrapper {
          height: 7px;
          width: 252px;
          border-color: #707070;
          border-width: 1px 0;
          background: black;
          position: relative;
        }

        #progress-wrapper::before {
          left: -18.1px;
          background: linear-gradient(to right, #B1EF07 50%, black 50%) right;
          background-size: 200% 100%;
          animation: fadeIn 0.24s forwards;
        }

        #progress-wrapper::after {
          right: -18.1px;
          background: linear-gradient(to right, #B1EF07 50%, black 50%) right;
          background-size: 200% 100%;
          animation: fadeIn 1s 2.9s forwards;
        }

        #progress-wrapper::before, #progress-wrapper::after {
          content: '';
          position: absolute;
          z-index: -1;
          top: -7px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #707070;
        }

        #progress-bar {
          width: 252px;
          height: 7px;
          text-align: left;
          position: relative;
          left: 0;
          background: linear-gradient(to right, #B1EF07 50%, transparent 0) right;
          background-size: 200% 100%;
          animation: fadeIn 3s 0.2s forwards;
        }

        @media screen and (max-width: 768px) {
          #progress-wrapper, #progress-bar {
            width: 120px;
          }

          #progress-wrapper::before, #progress-wrapper::after {
            width: 15px;
            height: 15px;
            top: -4.7px;
          }

          #progress-wrapper::before {
            left: -13px;
          }

          #progress-wrapper::after {
            right: -13px;
          }
        }

        @keyframes fadeIn {
          100% {
            background-position: left;
          }
        }
      `}</style>
    </div>
  )
}

export default ProgressBar;
