# Homepage image provenance

The homepage uses locally stored, optimised derivatives rather than loading imagery directly from Google Drive. This keeps rendering deterministic, removes a third-party runtime dependency and allows each image to be resized for its actual display context.

| Optimised asset | Source folder | Drive file ID | Intended use | Permission / content note |
|---|---|---|---|---|
| `commercial-ev-charging-installation-*` | GreenDawn Drive → Romford | `11brU6cLea15UXttQ2DO8YmYFgps5l00H` | Homepage hero / workplace imagery | Generic installation photograph; no client claim is made from the image. |
| `commercial-ev-wall-chargers-*` | GreenDawn Drive → Romford | `11brU6cLea15UXttQ2DO8YmYFgps5l00H` | Destination/public solution imagery | Alternate crop from the same generic installation image. |
| `sync-commercial-ev-charger-*` | GreenDawn Drive → Sync | `1wM7dn1b9x63B4liNNjJECqfBLt8ODTk0` | Fleet / technical hardware imagery | Sync is listed by GreenDawn as an approved supplier and explicit permission is recorded. |
| `commercial-ev-charger-hardware-*` | GreenDawn Drive → Seat Preston | `1axqAkfp4qRqMwDDM1D7ck_-w7aMcMF_B` | Hardware selection / supporting proof | Generic charging hardware photograph; no dealership/customer identity is asserted. |
| `commercial-ev-electrical-capacity-*` | GreenDawn Drive → Site Imagery | `1TeyQ_wH2Xo5F0SC76HSDIoHN1z9M-r33` | Grid, power and load-management content | Crop deliberately excludes legacy GreenDawn clothing/logos. |
| `ev-charging-ducting-survey-*` | GreenDawn Drive → Site Imagery | `1uvK8Xa8RfXsotF8wA1dR7iPI1qEz2Ro1` | Survey / project-planning content | Generic infrastructure detail. |
| `johnsons-cars-ev-charging-*` | Existing approved GreenDawn project asset | existing repo asset | Featured Johnsons case study | Johnsons public-use/testimonial approval is recorded in the evidence responses. |
| `salvation-army-ev-charging-*` | Existing approved GreenDawn project asset | existing repo asset | Salvation Army proof / multi-site imagery | GreenDawn has recorded permission to use The Salvation Army. |

## Excluded imagery

Project EV imagery is not used because GreenDawn explicitly marked Project EV as **DO NOT USE** pending clarification. Brayleys/Mazda imagery is not used because public-use permission is still pending. Elite Hotels imagery is not used because permission was explicitly declined. Joint Operations imagery has also been left out of the homepage because some frames appear to contain Project EV hardware and the project provenance is not sufficiently clear for publication.


## Stage 4 performance treatment

The hero set now includes a 480px derivative and the 640/960/1440 WebP files have been re-encoded with a lower payload while retaining the same responsive-image contract. The oversized 1920px wordmark is no longer used by the header/footer; a 480px transparent PNG derivative is used until the final vector brand assets arrive.
