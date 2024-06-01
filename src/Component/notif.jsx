
const Notif=({color})=>{
    return(
            <div style={{ position: 'relative', display: 'flex',width:"fit-content" }}>
                <svg
                    width="auto"
                    height="30"
                    viewBox="0 0 20 24"
                    fill="none"
                    // xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M10.0005 23C11.6528 23 13.0005 21.6523 13.0005 20H16.5805C18.3568 20 19.2609 17.8461 17.9976 16.5829L17.0005 15.5858V11C17.0005 7.84635 15.4218 4.99696 12.4997 3.9364C12.4661 2.58359 11.3616 1.5 10.0005 1.5C8.63982 1.5 7.53548 2.58311 7.50135 3.9355C4.57077 4.9944 3.00054 7.8374 3.00054 11V15.5858L2.00343 16.5829C0.755303 17.831 1.61293 20 3.41054 20H7.00054C7.00054 21.649 8.335 23 10.0005 23Z"
                    stroke={color}
                    strokeWidth="2"
                    />
                </svg>

                <span
                    style={{
                    position: 'absolute',
                    marginLeft: '1rem',
                    marginTop: '-8px',
                    display: 'flex',
                    height: '1.5rem',
                    width: '1.5rem',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '9999px', // Full circle
                    backgroundColor: '#ef4444', // Tailwind's red-500
                    fontSize: '0.875rem', // Tailwind's text-sm
                    fontWeight: 'bold',
                    color: 'white',
                    border: '2px solid white',
                    }}
                >
                    5
                </span>
            </div>
    )
}

export default Notif