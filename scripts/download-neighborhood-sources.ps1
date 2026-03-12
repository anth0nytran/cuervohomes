$ErrorActionPreference = "Stop"

$destination = Join-Path $PSScriptRoot "..\public\neighborhoods\source"
New-Item -ItemType Directory -Path $destination -Force | Out-Null

$items = @(
    @{
        File = "newport-beach.jpg"
        Url = "https://images.pexels.com/photos/19563088/pexels-photo-19563088.jpeg?cs=srgb&dl=pexels-kelly-19563088.jpg&fm=jpg"
    },
    @{
        File = "costa-mesa.jpg"
        Url = "https://images.pexels.com/photos/9250045/pexels-photo-9250045.jpeg?cs=srgb&dl=pexels-basiciggy-9250045.jpg&fm=jpg"
    },
    @{
        File = "huntington-beach.jpg"
        Url = "https://images.pexels.com/photos/20552017/pexels-photo-20552017.jpeg?cs=srgb&dl=pexels-adriana-coulson-1070894176-20552017.jpg&fm=jpg"
    },
    @{
        File = "santa-ana.jpg"
        Url = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Downtown%20Santa%20Ana.jpg"
    },
    @{
        File = "irvine.jpg"
        Url = "https://images.pexels.com/photos/1587947/pexels-photo-1587947.jpeg?cs=srgb&dl=pexels-godless-humanist-739743-1587947.jpg&fm=jpg"
    },
    @{
        File = "north-tustin.jpg"
        Url = "https://images.pexels.com/photos/33385147/pexels-photo-33385147.jpeg?cs=srgb&dl=pexels-keysi-estrada-2151553493-33385147.jpg&fm=jpg"
    },
    @{
        File = "orange.jpg"
        Url = "https://images.pexels.com/photos/13278726/pexels-photo-13278726.jpeg?cs=srgb&dl=pexels-mars-l-296478532-13278726.jpg&fm=jpg"
    },
    @{
        File = "anaheim.jpg"
        Url = "https://images.pexels.com/photos/35877130/pexels-photo-35877130.jpeg?cs=srgb&dl=pexels-nc-farm-bureau-mark-35877130.jpg&fm=jpg"
    }
)

foreach ($item in $items) {
    $outputPath = Join-Path $destination $item.File
    Invoke-WebRequest -Uri $item.Url -OutFile $outputPath
    Write-Output "Downloaded $($item.File)"
}
