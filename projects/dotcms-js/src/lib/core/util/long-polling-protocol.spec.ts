import { ReflectiveInjector } from '@angular/core';
import { StringUtils } from '../string-utils.service';
import { LoggerService } from '../logger.service';
import { LongPollingProtocol } from './long-polling-protocol';
import { CoreWebService } from '../core-web.service';
import { RequestMethod } from '@angular/http';
import { Observable, of, throwError } from 'rxjs';
import { ResponseView } from './response-view';

class CoreWebServiceMock {
    public requestView(): Observable<ResponseView> {
        return null;
    }
}

describe('LongPollingProtocol', () => {
    let injector: ReflectiveInjector;
    let coreWebServiceMock: CoreWebServiceMock;
    let longPollingProtocol: LongPollingProtocol;
    const url = 'http://testing';

    beforeEach(() => {
        coreWebServiceMock = new CoreWebServiceMock();

        injector = ReflectiveInjector.resolveAndCreate([
            { provide: CoreWebService, useValue: coreWebServiceMock },
            StringUtils,
            LoggerService
        ]);

        const loggerService = injector.get(LoggerService);

        longPollingProtocol = new LongPollingProtocol(url, loggerService, injector.get(CoreWebService));
    });

    it('should connect', () => {
        const requestOpts = {
            method: RequestMethod.Get,
            url: url,
            params: {}
        };

        spyOn(coreWebServiceMock, 'requestView').and.callFake(() => {
            longPollingProtocol.close();
            return of({
                entity: {
                    message: 'message'
                }
            });
        });

        longPollingProtocol.connect();

        expect(coreWebServiceMock.requestView).toHaveBeenCalledWith(requestOpts);
    });

    it('should trigger message', (done) => {
        const requestOpts = {
            method: RequestMethod.Get,
            url: url,
            params: {}
        };

        spyOn(coreWebServiceMock, 'requestView').and.callFake(() => {
            longPollingProtocol.close();
            return of({
                entity: {
                    message: 'message'
                }
            });
        });

        longPollingProtocol.message$().subscribe((message) => {
            expect(message).toEqual({
                message: 'message'
            });
            done();
        });

        longPollingProtocol.connect();

        expect(coreWebServiceMock.requestView).toHaveBeenCalledWith(requestOpts);
    });

    it('should reconnect after a message', () => {
        let firstMessage = true;
        const requestOpts = {
            method: RequestMethod.Get,
            url: url,
            params: {}
        };

        spyOn(coreWebServiceMock, 'requestView').and.callFake(() => {
            if (!firstMessage) {
                longPollingProtocol.close();
            }

            firstMessage = false;
            return of({
                entity: {
                    message: 'message'
                }
            });
        });

        longPollingProtocol.connect();

        expect(coreWebServiceMock.requestView).toHaveBeenCalledWith(requestOpts);
        expect(coreWebServiceMock.requestView).toHaveBeenCalledTimes(2);
    });

    it('should trigger a error', (done) => {
        const requestOpts = {
            method: RequestMethod.Get,
            url: url,
            params: {}
        };

        spyOn(coreWebServiceMock, 'requestView').and.callFake(() => {
            return throwError({
                entity: {}
            });
        });

        longPollingProtocol.error$().subscribe(() => {
            done();
        });
        longPollingProtocol.connect();

        expect(coreWebServiceMock.requestView).toHaveBeenCalledWith(requestOpts);
    });
});
