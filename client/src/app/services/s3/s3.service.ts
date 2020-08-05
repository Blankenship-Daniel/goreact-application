import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class S3Service {
  constructor() {}

  fileUpload(
    file,
    bucket = new S3({
      accessKeyId: environment.s3.accessKeyId,
      secretAccessKey: environment.s3.secretAccessKey,
      region: environment.s3.region,
    })
  ): Observable<any> {
    const params = {
      Bucket: environment.s3.bucket,
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type,
    };
    return Observable.create((observer) => {
      bucket.upload(params, (err, data) => {
        if (err) {
          observer.error(err);
        }
        observer.next(data);
        observer.complete();
      });
    });
  }
}
