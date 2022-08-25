import SVG, {IconProps} from './svg';

const IconDone = (props: IconProps) => (
	<SVG alt="Checkmark" {...props}>
		<path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z" />
	</SVG>
);

export default IconDone;
