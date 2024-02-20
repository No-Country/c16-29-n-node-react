export const PaginatedButtons = ({ table }) => {

      {/* <div className="w-[439px] h-[28X] flex items-center justify-between" style={{marginTop: 'auto', marginBottom: '12px'}}>
        <button onClick={() => table.previousPage()}
        className="w-[97px] flex gap-x-6 justify-between content-center text-[#A9A9A9] font-bold text-sm font-poppins focus:text-[#1368CE] active:text-[#1368CE]"
        >
          <svg
            width="13"
            height="22"
            viewBox="0 0 13 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            filter="drop-shadow(0 0 0 #1368CE)"
          >
            <path
              id="Vector"
              d="M13 2.47642V0.23268C13 0.0382038 12.7897 -0.0691937 12.6477 0.0498143L0.335963 10.27C0.231357 10.3564 0.146715 10.4672 0.0884906 10.5937C0.0302667 10.7202 0 10.8592 0 11C0 11.1408 0.0302667 11.2798 0.0884906 11.4063C0.146715 11.5328 0.231357 11.6436 0.335963 11.73L12.6477 21.9502C12.7924 22.0692 13 21.9618 13 21.7673V19.5236C13 19.3814 12.9372 19.2449 12.8334 19.1579L3.0015 11.0015L12.8334 2.84215C12.9372 2.75507 13 2.61865 13 2.47642Z"
              fill="#A9A9A9"
            />
          </svg>
          Anterior
        </button>
        <span>0</span>
        <button onClick={() => table.nextPage()}
        className="w-[97px] flex gap-x-6 justify-between content-center text-[#A9A9A9] font-bold text-sm font-poppins focus:text-[#1368CE] active:text-[#1368CE]"
        >
          Siguiente
          <svg
            width="13"
            height="22"
            viewBox="0 0 13 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector"
              d="M2.16495e-07 19.5236L2.03416e-08 21.7673C3.33988e-09 21.9618 0.210294 22.0692 0.35231 21.9502L12.664 11.73C12.7686 11.6436 12.8533 11.5328 12.9115 11.4063C12.9697 11.2798 13 11.1408 13 11C13 10.8592 12.9697 10.7202 12.9115 10.5937C12.8533 10.4672 12.7686 10.3564 12.664 10.27L0.352312 0.0498131C0.207564 -0.069194 1.91996e-06 0.0382031 1.90296e-06 0.232678L1.70681e-06 2.47642C1.69437e-06 2.61865 0.0628154 2.75507 0.166597 2.84215L9.9985 10.9985L0.166596 19.1579C0.062814 19.2449 2.28929e-07 19.3814 2.16495e-07 19.5236Z"
              fill="#1368CE"
            />
          </svg>          
        </button>
      </div> */}

  return (
    <div
      className="w-[439px] h-[28X] flex items-center justify-between"
      style={{ marginTop: "auto", marginBottom: "12px" }}
    >
      <button
        onClick={() => table.previousPage()}
        className="w-[97px] flex gap-x-6 justify-between content-center text-[#A9A9A9] font-bold text-sm font-poppins focus:text-[#1368CE] active:text-[#1368CE]"
      >
        <svg
          width="13"
          height="22"
          viewBox="0 0 13 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          filter="drop-shadow(0 0 0 #1368CE)"
        >
          <path
            id="Vector"
            d="M13 2.47642V0.23268C13 0.0382038 12.7897 -0.0691937 12.6477 0.0498143L0.335963 10.27C0.231357 10.3564 0.146715 10.4672 0.0884906 10.5937C0.0302667 10.7202 0 10.8592 0 11C0 11.1408 0.0302667 11.2798 0.0884906 11.4063C0.146715 11.5328 0.231357 11.6436 0.335963 11.73L12.6477 21.9502C12.7924 22.0692 13 21.9618 13 21.7673V19.5236C13 19.3814 12.9372 19.2449 12.8334 19.1579L3.0015 11.0015L12.8334 2.84215C12.9372 2.75507 13 2.61865 13 2.47642Z"
            fill="#A9A9A9"
          />
        </svg>
        Anterior
      </button>
      <span>0</span>
      <button
        onClick={() => table.nextPage()}
        className="w-[97px] flex gap-x-6 justify-between content-center text-[#A9A9A9] font-bold text-sm font-poppins focus:text-[#1368CE] active:text-[#1368CE]"
      >
        Siguiente
        <svg
          width="13"
          height="22"
          viewBox="0 0 13 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector"
            d="M2.16495e-07 19.5236L2.03416e-08 21.7673C3.33988e-09 21.9618 0.210294 22.0692 0.35231 21.9502L12.664 11.73C12.7686 11.6436 12.8533 11.5328 12.9115 11.4063C12.9697 11.2798 13 11.1408 13 11C13 10.8592 12.9697 10.7202 12.9115 10.5937C12.8533 10.4672 12.7686 10.3564 12.664 10.27L0.352312 0.0498131C0.207564 -0.069194 1.91996e-06 0.0382031 1.90296e-06 0.232678L1.70681e-06 2.47642C1.69437e-06 2.61865 0.0628154 2.75507 0.166597 2.84215L9.9985 10.9985L0.166596 19.1579C0.062814 19.2449 2.28929e-07 19.3814 2.16495e-07 19.5236Z"
            fill="#1368CE"
          />
        </svg>
      </button>
    </div>
  );
};
