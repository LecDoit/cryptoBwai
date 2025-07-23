import LogoBlack from '../../assets/LogoBlack.js';




export default function Logo({ size, color = 'currentColor', className = '' }) {
  return (
            <LogoBlack
              className={className}
              width={size}
              height={size}

              style={{ color }}
            />
)
}
