export function combineHTML(
    paramsScript,
    packagesScript,
    renderScript,
    styleCSS
) {
    return `
		<html>
  			<head>
    				<meta charset="utf-8" />
				${paramsScript}
				${atob(packagesScript)}
				${atob(renderScript)}
				${atob(styleCSS)}
  			</head>
		</html>
	
	`
}
